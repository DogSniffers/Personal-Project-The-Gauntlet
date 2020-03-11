SELECT users.username, leaderboard.floors, leaderboard.score, leaderboard.death
FROM leaderboard
INNER JOIN users ON leaderboard.userusername=users.username
ORDER BY score DESC