import {NextAuthMiddlewareOptions} from "next-auth/middleware";

export { default } from "next-auth/middleware"

export const config = { matcher: ["/exams", "/assignments", "/submissions", "/exams", "/exams/my"] };