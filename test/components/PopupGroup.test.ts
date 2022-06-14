import { isValidElement, createElement } from 'react';
import { createPopupGroup } from '../../src/components/PopupGroup';

describe('PopupGroup', () => {
    it('should create popup group', () => {
        const group = createPopupGroup();
        expect(group.groupId).toBeDefined();
        expect(isValidElement(createElement(group))).toBeTruthy();
    });
});
