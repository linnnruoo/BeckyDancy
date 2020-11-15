enum Move {
  Hair = 1,
  Pushback = 2,
  Rocket = 3,
  Scarecrow = 4,
  Shouldershrug = 5,
  Windowwipe = 6,
  Zigzag = 7,
  Elbowlock = 8,
  Logout = 9,
}

export const getMoves = () => Object.values(Move)

export default Move
