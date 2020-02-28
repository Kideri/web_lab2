package server;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;

import static java.lang.Math.abs;

public class AreaCheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        ResultsHolder holder = (ResultsHolder) request.getSession().getAttribute("results");

        try {
            if (request.getParameter("clear").equals("clear")) {
                holder.clear();
                response.setContentType("text/plain; charset=UTF-8");
                Writer out = response.getWriter();
                out.write("clear");
                return;
            }
        }catch (NullPointerException ignored){}

        RequestParser parser = new RequestParser(request);

        Result result = new Result();
        try {
            double x = parser.getX();
            double y = parser.getY();
            double r = parser.getR();
            result = new Result(x,y,r,inside(x,y,r));
        } catch (NumberFormatException e) {
            System.err.println("Bad args");
        }finally {
            holder.add(result);
        }

        response.setContentType("text/html; charset=UTF-8");
        Writer out = response.getWriter();
        out.write(result.toString());
    }

    private boolean inside(double x, double y, double r) {
        if (x >= 0 && y >= 0 && -1 * y >= x - (r / 2)) return true;
        if (x >= -r && x <= 0 && y <= 0 && y >= -r) return true;
        return x >= 0 && y <= 0 && x * x + y * y <= r * r / 4;
    }
}


class RequestParser {
    private static final int[] ALLOWED_X = {-4, -3, -2, -1, 0, 1, 2, 3, 4};
    private static final double[] ALLOWED_R = {1, 2, 3, 4, 5};

    private HttpServletRequest request;
    private final boolean FROM_FORM;

    public RequestParser(HttpServletRequest request) {
        this.request = request;
        FROM_FORM = request.getParameter("submit_btn") != null;
    }

    public double getR() throws NumberFormatException {
        double doubleR = Double.parseDouble(request.getParameter("r"));
        if (FROM_FORM) {
            for (double allowedR : ALLOWED_R) {
                if (allowedR == abs(doubleR))
                    return doubleR;
            }
        } else {
            return doubleR;
        }
        throw new NumberFormatException();
    }

    public double getY() throws NumberFormatException {
        double doubleY = Double.parseDouble(request.getParameter("y"));

        if (FROM_FORM) {
            if (doubleY <= 5 && doubleY >= -5)
                return doubleY;
        } else return doubleY;

        throw new NumberFormatException();
    }

    public double getX() throws NumberFormatException {
        double doubleX = Double.parseDouble(request.getParameter("x"));
        if (FROM_FORM) {
            for (double allowedX : ALLOWED_X) {
                if (allowedX == doubleX)
                    return doubleX;
            }
        } else {
            return doubleX;
        }
        throw new NumberFormatException();
    }

    public boolean isFROM_FORM() {
        return FROM_FORM;
    }
}
