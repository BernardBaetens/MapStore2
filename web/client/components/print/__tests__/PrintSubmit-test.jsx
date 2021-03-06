/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';

import React from 'react';
import ReactDOM from 'react-dom';
import PrintSubmit from '../PrintSubmit';
import ReactTestUtils from 'react-dom/test-utils';

describe("Test the PrintSubmit component", () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('creates component with defaults', () => {
        const cmp = ReactDOM.render(<PrintSubmit/>, document.getElementById("container"));
        expect(cmp).toExist();

        const node = ReactDOM.findDOMNode(cmp);
        expect(node).toExist();
        expect(node.tagName.toLowerCase()).toBe('button');
        expect(node.disabled).toNotExist();
    });

    it('creates component disabled', () => {
        const cmp = ReactDOM.render(<PrintSubmit disabled/>, document.getElementById("container"));
        expect(cmp).toExist();

        const node = ReactDOM.findDOMNode(cmp);
        expect(node).toExist();
        expect(node.tagName.toLowerCase()).toBe('button');
        expect(node.classList.contains('disabled')).toBe(true);
    });

    it('creates component loading', () => {
        const cmp = ReactDOM.render(<PrintSubmit loading/>, document.getElementById("container"));
        expect(cmp).toExist();
        const node = ReactDOM.findDOMNode(cmp);
        expect(node.getElementsByClassName('spinner').length).toBe(1);
    });

    it('pdf onPrint', (done) => {
        const handler = (e) => {
            expect(e).toExist();
            done();
        };
        const cmp = ReactDOM.render(<PrintSubmit onPrint={handler}/>, document.getElementById("container"));
        expect(cmp).toExist();
        const node = ReactDOM.findDOMNode(cmp);
        ReactTestUtils.Simulate.click(node);
    });
});
