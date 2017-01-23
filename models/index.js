const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        // allowNull: true
    }
}, {
    getterMethods: {
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    },
    hooks: {
        beforeValidate: function(page, options) {
            if (page.title) {
                // Removes all non-alphanumeric characters from title
                // And make whitespace underscore
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            } else {
                // Generates random 5 letter string
                page.urlTitle = Math.random().toString(36).substring(2, 7);
            }
            // console.log(page);
        }
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User
};
