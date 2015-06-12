"use strict";
var HeadingHandlers = React.createClass({displayName: "HeadingHandlers",
    selectAllCheckboxes: function(){
        var multiCheckbox = $(React.findDOMNode(this.refs.multiCheckbox));
        $('.panel-body table input[type="checkbox"]').prop('checked', multiCheckbox.prop('checked'));
    },
    showIdsInConsole: function(){
        var idsString = [];
        $('.panel-body table input[type="checkbox"]').each(function(i,c){
            if (c.checked == true){idsString.push($(c).val());}
        });
        if (idsString.length>0){console.log('Selected users have ids: '+idsString);}
        else {console.log('You selected nothing.')}
    },
    render: function(){
        return (
            React.createElement("div", null, 
                React.createElement("input", {className: "multi-select", type: "checkbox", onClick: this.selectAllCheckboxes, ref: "multiCheckbox"}), 
                React.createElement("button", {className: "btn btn-default action-button", type: "submit", onClick: this.showIdsInConsole}, "Show selected id's")
            )
        );
    }
});
var TableList = React.createClass({displayName: "TableList",
    doWithMultiSelector: function(){
        var selectedCheckBoxes = 0;
        $('.panel-body table input[type="checkbox"]').each(function(i,c){
            if (c.checked == true){selectedCheckBoxes++}
        });
        if (selectedCheckBoxes == 0) {
            $('.panel-heading input[type="checkbox"]').prop("indeterminate", false);
            $('.panel-heading input[type="checkbox"]').prop('checked', false);
        }else if(selectedCheckBoxes == ($('.panel-body table input[type="checkbox"]').length)){
            $('.panel-heading input[type="checkbox"]').prop("indeterminate", false);
            $('.panel-heading input[type="checkbox"]').prop('checked', true);
        }else{
            $('.panel-heading input[type="checkbox"]').prop("indeterminate", true);
        }
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },
    render: function() {
        var that = this;
        var userNodes = this.state.data.map(function(user){
            return (
                React.createElement("tr", null, 
                    React.createElement("th", {scope: "row"}, React.createElement("input", {type: "checkbox", value: user.id, onChange: that.doWithMultiSelector})), 
                    React.createElement("td", null, user.firstName), 
                    React.createElement("td", null, user.lastName), 
                    React.createElement("td", null, user.userName)
                )
            );
        });
        return (
            React.createElement("table", {className: "table"}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        React.createElement("th", null, "#"), 
                        React.createElement("th", null, "First Name"), 
                        React.createElement("th", null, "Last Name"), 
                        React.createElement("th", null, "Username")
                    )
                ), 
                React.createElement("tbody", null, 
                    userNodes
                )
            )
        );
    }
});
function reactRender(domHtml,domObj){
    React.render(
      domHtml,
      domObj[0]
    );
}

reactRender(
    React.createElement(HeadingHandlers, null),
    $('.panel-heading')
);

reactRender(
    React.createElement(TableList, {url: "/json/data.json"}),
    $('.panel-body')
);