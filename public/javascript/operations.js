$(document).ready(function () {
    //document ready
    console.log("Ready!");
    var response;

    $(document).on("submit", "#get-capabilities", function (e) {
        e.preventDefault();
        $('#response').text('');
        $('#records').text('');
        $('.loading').css('display', 'block');
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://metaveri.geoportal.gov.tr/csbgeoportalusermanagement/CswService/Csw?REQUEST=GetCapabilities&SERVICE=CSW&ACCEPTVERSION=2.0.2,2.0.0,0.7.2&outputFormat=application/xml",
            type: "GET",
            //crossDomain: true,
            dataType: 'xml',
            success: function (data) {
                s = new XMLSerializer();
                var newXmlStr = s.serializeToString(data);
                $('#response').text(newXmlStr);
                highlightCodeBlock();
                $('.loading').css('display', 'none');

            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    $(document).on("submit", "#get-records", function (e) {
        e.preventDefault();
        $('#records').text('');
        $('#response').text('');
        var keyword = $("#keyword").val();
        var numRecords = $("#numberofrecords").val();
        $('.loading').css('display', 'block');
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://metaveri.geoportal.gov.tr/csbgeoportalusermanagement/CswService/Csw",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic Q1JOXzEwMDpDcm4hMjAxOA==');
            },
            type: "post",
            contentType: 'text/xml',
            data: '<?xml version="1.0" encoding="UTF-8"?> ' +
                '<csw:GetRecords  maxRecords="'+numRecords+'" xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" service="CSW" version="2.0.2">' +
                '<csw:Query typeNames="csw:Record">' +
                '<csw:Constraint version="1.1.0">'+
                '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">'+
                  '<PropertyIsLike wildCard="%" singleChar="_" escape="\\">'+
                    '<PropertyName>AnyText</PropertyName>'+
                    '<Literal>%'+keyword+'%</Literal>'+
                  '</PropertyIsLike>'+
                '</Filter>'+
              '</csw:Constraint>' +
            '</csw:Query>' +
            '</csw:GetRecords>',
            dataType: "text",
            success: function (d) {
                debugger;
                // console.log(d);
                // s = new XMLSerializer();
                // var newXmlStr = s.serializeToString(d);
                $('#response').text(d.replaceAll('>', '>\n'));
                $('.loading').css('display', 'none');
                highlightCodeBlock();
            },
            error: function (e) {
                console.log(e);
            }
        });
    });
});

function highlightCodeBlock() {
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};