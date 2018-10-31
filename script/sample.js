Knoema.Helpers.ready(function () {
    new sampleApp();
});
 
sampleApp.prototype.getCountries = function () {
 
    // call 'get' helper from knoema-app.js
    Knoema.Helpers.get('/api/1.0/meta/dataset/UNFAOPS2011Aug/dimension/Country', function (result) {
 
        // append data to the container using buildHTML helper 
        $.each(result.items, function () {
            $(Knoema.Helpers.buildHTML('option', this.name, { 'value': this.key }))
                .appendTo($('#country'));
        });
    });
};
 
 
 
sampleApp.prototype.bindEvents = function () {  
    var app = this; 
    $('#country').change(function(){
        app.getChart();
    }); 
    $('#product').change(function(){
        app.getChart();
    });
};


sampleApp.prototype.getDataDescriptor = function (country, product) {       
    return {
        'Header': [
            {
                'DimensionId': 'Time',
                'Members': ['1999-2009'], 
                'UiMode':'range'
            }],
        'Stub': [
            {
                'DimensionId': "Country",
                'Members': [country]
            },
            {
                'DimensionId': 'Item',
                'Members': [product]
            },
            {
                'DimensionId': 'Element',
                'Members': [1000020]
            }],
        'Filter': [],
        'Frequencies':['A'],
        'Dataset': 'UNFAOPS2011Aug'
    };
};


sampleApp.prototype.getChart = function () {    
    var data = {
        gadget: {           
            // get data descriptor
            dataDescriptor: this.getDataDescriptor($('#country').val(), $('#product').val()),
            gadgetClass: "Knoema.Chart",
            naked: true
        },
        // set chart size
        size: {
            width: 400,
            height: 250
        }
    };
 
    // render chart gadget
    $('#chart').gadget(data);
};


var sampleApp = function () {  
 
    // set client id
    Knoema.Helpers.clientId = 'VWYp7V1QmWqSCA';
     
    //start application
    this.getCountries();
    this.getProducts();
    this.bindEvents();
};
