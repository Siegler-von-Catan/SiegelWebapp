export class ResultData {
    public heightmap: string = "";
    public stl: string = "";
    public original: any = {};
    public backLink: string = "";

    private constructor() {}
    public static readonly instance = new ResultData();
}