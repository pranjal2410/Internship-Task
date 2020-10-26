from api import app, db
from flask import request, jsonify
from api.models import Team, Match


@app.route('/api/get-all-matches/', methods=['GET'])
def getMatches():
    all_matches = Match.query.all()
    data = []
    for match in all_matches:
        match_data = {}
        match_data['home_team'] = match.home_team
        match_data['away_team'] = match.away_team
        match_data['winner'] = match.winner
        match_data['winning_margin'] = match.winner + ' won by ' + match.won_by
        data.append(match_data)
    return jsonify(data)


@app.route('/api/get-match/', methods=['GET'])
def getMatch():
    data = request.get_json()
    match = Match.query.filter_by(home_team=data.get('home_team'), away_team=data.get('away_team'))
    if len(match) > 0:
        match_data =


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


@app.route('/api/get-team/', methods=['GET'])
def getTeams():
    all_teams = Team.query.all()
    for team in all_teams:
        teams_dict = dict((col, getattr(Team, col)) for col in team.__table__.columns.keys())
    return jsonify(teams_dict)
