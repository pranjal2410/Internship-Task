from api import db


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(30), unique=True, nullable=False)
    coach_name = db.Column(db.String(30), nullable=False)
    captain_name = db.Column(db.String(30), nullable=False)
    total_matches_played = db.Column(db.Integer, nullable=False)
    total_matches_won = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Team('{self.team_name}')"


class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    home_team = db.Column(db.String(30), db.ForeignKey('team.team_name'), nullable=False)
    away_team = db.Column(db.String(30), db.ForeignKey('team.team_name'), nullable=False)
    winner = db.Column(db.String(30), nullable=False)
    won_by = db.Column(db.String(150), nullable=False)
    num_of_six_home = db.Column(db.Integer, nullable=False)
    num_of_six_away = db.Column(db.Integer, nullable=False)
    num_of_four_home = db.Column(db.Integer, nullable=False)
    num_of_four_away = db.Column(db.Integer, nullable=False)
    motm = db.Column(db.String(30), nullable=False)
    wickets_home = db.Column(db.Integer, nullable=False)
    wickets_away = db.Column(db.Integer, nullable=False)
    runs_home = db.Column(db.Integer, nullable=False)
    runs_away = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Match('{self.home_team} vs {self.away_team}')"
