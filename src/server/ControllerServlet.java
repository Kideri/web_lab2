package server;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class ControllerServlet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            boolean forAreaCheck = req.getParameter("clear")!=null;

        forAreaCheck = forAreaCheck || req.getParameter("x") != null &&
                req.getParameter("y") != null &&
                req.getParameterValues("r") != null;

        if (forAreaCheck) {
            req.getRequestDispatcher("check").forward(req, resp);
        } else
            req.getRequestDispatcher("index.jsp").forward(req, resp);
    }
}