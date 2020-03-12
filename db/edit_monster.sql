UPDATE monsters
SET name=$1,
    class=$2,
    health=$3,
    weaknesses=$4,
    resistances=$5,
    attack1name=$6,
    attack1type=$7,
    attack1damage=$8,
    attack2name=$9,
    attack2type=$10,
    attack2damage=$11,
    xpReward=$12,
    scoreReward=$13
WHERE id=$14