import { Strategy } from 'passport'

export interface PassportStrategy {
   name: string,
   strategy: Strategy
}

