/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

/*global $, jQuery, Jasmine, describe, it, expect, allFeeds, document, loadFeed, beforeEach, done, $feed, $newFeed*/
/*jshint esversion: 6*/

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        }); //Checks to see if the allFeeds variable is defined

        it('URL defined and not empty', function() {
            allFeeds.forEach (function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }); //Checks to see if the feed url is defined and not empty
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name defined and not empty', function() {
            allFeeds.forEach (function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }); //Checks to see if the feed name is defined and not empty
        });
    });
    
    //Test suite for the menu
    describe('The menu', function() {
        it('Menu Element is hidden by default', function() {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        }); //Checks to see if the menu bar is hidden on load
        
        it('Menu opens on menu icon click', function() {
            $('.menu-icon-link').trigger('click');
            expect($(document.body).hasClass('menu-hidden')).toBe(false);
        }); //Triggers menu click action, checks to see if the menu bar opens
        
        it('Menu hides on menu icon click', function() {
            $('.menu-icon-link').trigger('click');
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        }); //Triggers menu click action, checks to see if the menu bar hides
    });
        
    //Test suite for Initial Entries
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done); //Loads the feed before the test begins
        });
        it('loadFeed is called and completed work with one feed', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        }); //Checks if there's at least one entry in the feed
    });
    
    //New feed selection test suite
    //One test: if content changes on load
    describe('New Feed Selection', function() {
        
        let feed, newFeed;
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed = $('.feed').html();
                done();
            }); //Stores text within variable 'feed'            
        });
        
        
        
        it('Content changes on new feed load', function(done) {
            loadFeed(1, function() {
                newFeed = $('.feed').html(); //Stores need feed header title within 'newFeed'
            
                expect(feed).not.toEqual(newFeed); //Checks if the original feed title is not equivalent to the new feed 
                //Returns true if not equivalent
                done();
            });
        });
    });
}());
