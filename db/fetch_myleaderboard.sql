SELECT users.username, leaderboard.floors, leaderboard.score, leaderboard.death
FROM leaderboard
INNER JOIN users ON leaderboard.userusername=users.username
WHERE users.username = $1