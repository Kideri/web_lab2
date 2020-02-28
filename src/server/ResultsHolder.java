package server;

import java.util.ArrayList;

public class ResultsHolder {
    private ArrayList<Result> results;

    public ResultsHolder() {
        results=new ArrayList<Result>();
    }

    public ArrayList<Result> getResults() {
        return results;
    }

    public void setResults(ArrayList<Result> results) {
        this.results = results;
    }

    public void add(Result result){
        results.add(result);
    }

    @Override
    public String toString() {
        StringBuilder res= new StringBuilder();
        Result[] resArray = new Result[results.size()];
        results.toArray(resArray);
        for(int i=resArray.length-1; i>-1;i--){
            res.append(resArray[i].toString());
        }
        return "<table id=\"res_table\" class=\"tableBodyScroll\"><thead><tr><td>X</td><td>Y</td><td>R</td><td>Result</td></tr></thead><tbody id=\"tbody\">"+ res.toString() +"</tbody></table>";
    }

    public void clear(){
        results = new ArrayList<Result>();
    }
}
