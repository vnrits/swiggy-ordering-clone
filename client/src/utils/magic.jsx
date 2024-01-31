import {Magic} from "magic-sdk"

const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY
export const magic = new Magic(PUBLISHABLE_KEY, { deferPreload: true });