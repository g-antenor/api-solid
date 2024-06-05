export class LateValidationCheckIn extends Error {
  constructor() {
    super('The check-in can only be validated')
  }
}
