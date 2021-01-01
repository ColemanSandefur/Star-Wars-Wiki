export default class Config {
    public static port: number =  <number><any>process.env.PORT || 8081;
}