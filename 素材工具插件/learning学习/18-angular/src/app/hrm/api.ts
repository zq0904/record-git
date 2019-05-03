import { port } from '../../../mock/config'

const prefix = `http://0.0.0.0:${port}`
const prefix2 = 'http://0.0.0.0:3010'

export const Token = prefix + '/token'
export const Employees = prefix2 + '/employees'

