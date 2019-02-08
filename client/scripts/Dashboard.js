Rank = function(category, element, top)
{
    category.sort(function(x, y){return y.points - x.points});

    let html = "";

    for(let i = 0; i < top; i++)
    {
        if(i < category.length) {
            html +=
                "<tr>" +
                "<th scope ='row'>" + (i + 1) + "</th>" +
                "<td>" + category[i].name + "</td>" +
                "<td>" + category[i].points + "</td>" +
                "</tr>";
        }
    }
    element.append(html);

}
