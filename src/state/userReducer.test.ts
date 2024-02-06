
import { userReducer } from "./userReducer";

test('user reducer should increment only age', () => {
    const startState = {age : 20, childrenCount : 2, name : 'Narek'}
    const endState = userReducer(startState, {type : 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test("user reducer sholud increment only childrenCount", () => {
    const startState = {age : 20, childrenCount : 2, name : "Narek"}

    const endState = userReducer(startState, {type : 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)

})

test("user reducer should change user name", () => {
    const startState = {age : 20, childrenCount : 2, name : "Narek"}

    const endState = userReducer(startState, {type : 'CHANGE-NAME'})

    expect(endState.name).toBe("Nare")
    expect(endState.age).toBe(20)
})