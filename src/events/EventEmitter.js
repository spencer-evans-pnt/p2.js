/**
 * Base class for objects that dispatches events.
 * @class EventEmitter
 * @constructor
 */
var EventEmitter = function () {};

module.exports = EventEmitter;

EventEmitter.prototype = {
    constructor: EventEmitter,

    /**
     * Add an event listener
     * @method on
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventEmitter} The self object, for chainability.
     */
    on: function ( type, listener, context ) {
        context = context || this;
        if ( this._listeners === undefined ){
            this._listeners = {};
        }
        var listeners = this._listeners;
        if ( listeners[ type ] === undefined ) {
            listeners[ type ] = [];
        }
        if ( listeners[ type ].findIndex( function( l ) {
            return l.listener === listener && l.context === context;
        } ) === -1 ) {
            listeners[ type ].push( {
                listener: listener,
                context: context
            } );
        }
        return this;
    },

    /**
     * Check if an event listener is added
     * @method has
     * @param  {String} type
     * @param  {Function} listener
     * @return {Boolean}
     */
    has: function ( type, listener, context ) {
        context = context || this;
        if ( this._listeners === undefined ){
            return false;
        }
        var listeners = this._listeners;
        if(listener){
            if ( listeners[ type ] !== undefined && listeners[ type ].findIndex( function( l ) {
                return l.listener === listener && l.context === context;
            } ) !== -1 ) {
                return true;
            }
        } else {
            if ( listeners[ type ] !== undefined ) {
                return true;
            }
        }

        return false;
    },

    /**
     * Remove an event listener
     * @method off
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventEmitter} The self object, for chainability.
     */
    off: function ( type, listener, context ) {
        context = context || this;
        if ( this._listeners === undefined ){
            return this;
        }
        var listeners = this._listeners;
        var index = listeners[ type ].findIndex( function( l ) {
            return l.listener === listener && l.context === context;
        } );
        if ( index !== -1 ) {
            listeners[ type ].splice( index, 1 );
        }
        return this;
    },

    /**
     * Emit an event.
     * @method emit
     * @param  {Object} event
     * @param  {String} event.type
     * @return {EventEmitter} The self object, for chainability.
     */
    emit: function ( event ) {
        if ( this._listeners === undefined ){
            return this;
        }
        var listeners = this._listeners;
        var listenerArray = listeners[ event.type ];
        if ( listenerArray !== undefined ) {
            event.target = this;
            for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {
                var wrapper = listenerArray[ i ];
                wrapper.listener.call( wrapper.context, event );
            }
        }
        return this;
    }
};
