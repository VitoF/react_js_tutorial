var HeadingHandlers = React.createClass({
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
            <div>
                <input className="multi-select" type="checkbox" onClick={this.selectAllCheckboxes} ref="multiCheckbox"/>
                <button className="btn btn-default action-button" type="submit" onClick={this.showIdsInConsole}>Show selected id's</button>
            </div>
        );
    }
});