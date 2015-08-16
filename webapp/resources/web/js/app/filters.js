//Add filter with choice the format date to show
module.filter('momentFormat', function() {
    return function(date) {
        return moment(date).format("dddd Do MMMM YYYY");
    };
});
