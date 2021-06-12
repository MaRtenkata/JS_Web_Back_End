module.exports = {
    notFound: (req, res) => {
        res.render('404',{title: '404 Not Found'});
    }

}