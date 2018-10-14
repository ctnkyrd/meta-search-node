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
                xhr.setRequestHeader('Authorization', 'Basic ZW50ZWdyYXN5b25hcmRhOlR1Y2JzPzA3YQ==');
            },
            type: "post",
            contentType: 'text/xml',
            data: '<?xml version="1.0" ?>' +
                '<csw:GetRecords maxRecords="'+numRecords+'" outputFormat="application/xml" outputSchema="http://www.opengis.net/cat/csw/2.0.2" resultType="results" service="CSW" version="2.0.2" xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">' +
                '<csw:Query typeNames="csw:Record">' +
                '<csw:ElementSetName>full</csw:ElementSetName>' +
                '<csw:Constraint version="1.1.0">' +
                '<ogc:Filter>' +
                '<ogc:PropertyIsLike escapeChar="\" singleChar="_" wildCard="%">' +
                '<ogc:PropertyName>csw:AnyText</ogc:PropertyName>' +
                '<ogc:Literal>%'+keyword+'%</ogc:Literal>' +
                '</ogc:PropertyIsLike>' +
                '</ogc:Filter>' +
                '</csw:Constraint>' +
                '</csw:Query>' +
                '</csw:GetRecords>',
            dataType: "text",
            success: function (d) {
                // console.log(d);
                // s = new XMLSerializer();
                // var newXmlStr = s.serializeToString(d);
                $('#records').text(d);
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