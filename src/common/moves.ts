enum Move {
  Elbowlock = 0,
  Hair = 1,
  Pushback = 2,
  Rocket = 3,
  Scarecrow = 4,
  Shouldershrug = 5,
  Windows = 6,
  Zigzag = 7,
}

export const getMoves = () => Object.values(Move)

export default Move