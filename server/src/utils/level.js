export const calculationLevel = (xp) => {
    let level = 1;

    if (xp >= 100) level = 2;
    if (xp >= 250) level = 3;
    if (xp >= 450) level = 4;
    if (xp >= 700) level = 5;

    return level;
}