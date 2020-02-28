package server;

public class Result {
    private double x,y,r;
    private boolean inside;
    private boolean correct;

    public Result(){
        correct=false;
    }

    public Result(double x, double y, double r, boolean inside) {
        correct=true;
        this.x = x;
        this.y = y;
        this.r = r;
        this.inside = inside;
    }

    @Override
    public String toString() {
        if (correct) return "<tr>"+tdString(x)+ tdString(y) + tdString(r)+ tdString(inside?"True":"False")+"</tr>";
        else return "<tr><td colspan='6'><b>Неверные аргументы</b></td></tr>";
    }

    private String tdString(Object s){
        return String.format("<td>%s</td>",s.toString());
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isInside() {
        return inside;
    }
}
