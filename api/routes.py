from api import app, db, rest_api
from flask import request, jsonify
from api.models import Team, Match, Tournament
from flask_restful import Resource, reqparse


class AllMatches(Resource):
    def get(self):
        all_matches = Match.query.all()
        data = []
        for match in all_matches:
            match_data = {
                'id': match.id,
                'home_team': match.home_team,
                'away_team': match.away_team,
                'winner': match.winner,
                'winning_margin': match.winner + ' won by ' + match.won_by
            }
            data.append(match_data)
        return data


class SingleMatch(Resource):
    def get(self, match_id):
        match = Match.query.filter_by(id=match_id).first()
        match_data = {
            'winner': match.winner,
            'score_of_home_team': match.runs_home,
            'wickets_of_home_team': match.wickets_home,
            'score_of_away_team': match.runs_away,
            'wickets_of_away_team': match.wickets_away,
            'num_of_six_home': match.num_of_six_home,
            'num_of_six_away': match.num_of_six_away,
            'num_of_four_home': match.num_of_four_home,
            'num_of_four_away': match.num_of_four_away,
            'man_of_the_match': match.motm,
        }

        return match_data

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('home_team',
                            type=str,
                            required=True,
                            help='You need to fill name of home_team!'
                            )
        parser.add_argument('away_team',
                            type=str,
                            required=True,
                            help='You need to fill name of away_team!'
                            )
        parser.add_argument('winner',
                            type=str,
                            required=True,
                            help='You need to fill name of winner!'
                            )
        parser.add_argument('num_of_six_home',
                            type=int,
                            required=True,
                            help='You need to fill number of six of home_team!'
                            )
        parser.add_argument('num_of_six_away',
                            type=int,
                            required=True,
                            help='You need to fill number of six of away_team!'
                            )
        parser.add_argument('num_of_four_home',
                            type=int,
                            required=True,
                            help='You need to fill number of fours of home_team!'
                            )
        parser.add_argument('num_of_four_away',
                            type=int,
                            required=True,
                            help='You need to fill number of fours of away_team!'
                            )
        parser.add_argument('motm',
                            type=str,
                            required=True,
                            help='You need to fill name of man of the match as motm!'
                            )
        parser.add_argument('won_by',
                            type=str,
                            required=True,
                            help='You need to fill the winning margin as won_by!'
                            )
        parser.add_argument('wickets_home',
                            type=int,
                            required=True,
                            help='You need to fill the number of wickets lost by home team as wickets_home!'
                            )
        parser.add_argument('wickets_away',
                            type=int,
                            required=True,
                            help='You need to fill the number of wickets lost by away team as wickets_away!'
                            )
        parser.add_argument('runs_home',
                            type=int,
                            required=True,
                            help='You need to fill the number of runs scored by home team as runs_home!'
                            )
        parser.add_argument('runs_away',
                            type=int,
                            required=True,
                            help='You need to fill the number of runs scored by away team as runs_away!'
                            )
        data = parser.parse_args()
        check_match = next(filter(lambda match: match.home_team == data.get('home_team') and
                                                match.away_team == data.get('away_team'), Match.query.all()), None)
        if check_match is not None:
            return {'message': 'Match record already exists!'}, 404
        match = Match(home_team=data.get('home_team'),
                      away_team=data.get('away_team'),
                      winner=data.get('winner'),
                      won_by=data.get('won_by'),
                      num_of_six_home=data.get('num_of_six_home'),
                      num_of_six_away=data.get('num_of_six_away'),
                      num_of_four_home=data.get('num_of_four_home'),
                      num_of_four_away=data.get('num_of_four_away'),
                      motm=data.get('motm'),
                      runs_home=data.get('runs_home'),
                      runs_away=data.get('runs_away'),
                      wickets_home=data.get('wickets_home'),
                      wickets_away=data.get('wickets_away'))
        db.session.add(match)
        db.session.commit()
        return {'message': 'Match recorded successfully!'}, 200


class AddTeam(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('team_name',
                            type=str,
                            required=True,
                            help="You need to fill the team's name as team_name!")
        parser.add_argument('coach_name',
                            type=str,
                            required=True,
                            help="You need to fill the coach's name as coach_name!")
        parser.add_argument('captain_name',
                            type=str,
                            required=True,
                            help="You need to fill the captain's name as captain_name!")
        parser.add_argument('total_matches_played',
                            type=int,
                            required=True,
                            help="You need to fill the team's total match count as total_matches_played!")
        parser.add_argument('total_matches_won',
                            type=int,
                            required=True,
                            help="You need to fill the team's total win count as total_matches_won!")
        parser.add_argument('points',
                            type=int,
                            required=True,
                            help="You need to fill the team's current points in the tournament as points!")
        parser.add_argument('tour_name',
                            type=str,
                            help="You need to fill the team's current tournament name as tour_name!")
        data = parser.parse_args()
        check_team = next(filter(lambda team: team.team_name == data.get('team_name'), Team.query.all()), None)
        if check_team is not None:
            return {'message': 'Team record already exists!'}, 404
        team = Team(team_name=data.get('team_name'),
                    coach_name=data.get('coach_name'),
                    captain_name=data.get('captain_name'),
                    total_matches_played=data.get('total_matches_played'),
                    total_matches_won=data.get('total_matches_won'),
                    points=data.get('points'),
                    tour_id=Tournament.query.filter_by(tour_name=data.get('tour_name').first().id))
        db.session.add(team)
        db.session.commit()

        return {'message': 'Team data successfully added!'}, 200


rest_api.add_resource(AllMatches, '/api/get-all-matches/')
rest_api.add_resource(SingleMatch, '/api/one-match/', '/api/one-match/<int:match_id>/')
rest_api.add_resource(AddTeam, '/api/add-team/')
