from api import app, db
from flask import request, jsonify
from api.models import Team, Match


@app.route('/api/get-all-matches/', methods=['GET'])
def getMatches():
    all_matches = Match.query.all()
    data = []
    for match in all_matches:
        match_data = {
            'home_team': match.home_team,
            'away_team': match.away_team,
            'winner': match.winner,
            'winning_margin': match.winner + ' won by ' + match.won_by
        }
        data.append(match_data)
    return jsonify(data)


@app.route('/api/get-match/<int:match_id>/', methods=['GET'])
def getMatch(match_id):
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

    return jsonify(match_data)


@app.route('/api/add-match/', methods=['POST'])
def addMatch():
    data = request.get_json()
    flag = False
    for key, value in data.items():
        if value is None or key is None:
            flag = True
            break
    if flag:
        return jsonify({'message': 'Please enter complete data of match'})
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
    return jsonify({'message': 'Match recorded successfully!'})


@app.route('/api/add-team/', methods=['POST'])
def addTeam():
    data = request.get_json()
    flag = False
    for key, value in data.items():
        if value is None or key is None:
            flag = True
            break
    if flag:
        return jsonify({'message': 'Please enter complete data of team'})
    team = Team(team_name=data.get('team_name'),
                coach_name=data.get('coach_name'),
                captain_name=data.get('captain_name'),
                total_matches_played=data.get('total_matches_played'),
                total_matches_won=data.get('total_matches_won'),
                points=data.get('points'))
    db.session.add(team)
    db.session.commit()

    return jsonify({'message': f'Team named {team.team_name} added to database successfully!'})


@app.route('/api/get-team/', methods=['GET'])
def getTeams():
    all_teams = Team.query.all()
    return all_teams
