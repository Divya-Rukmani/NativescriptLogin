/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var TAG_TO_PLACEHOLDER_NAMES = {
    'A': 'LINK',
    'B': 'BOLD_TEXT',
    'BR': 'LINE_BREAK',
    'EM': 'EMPHASISED_TEXT',
    'H1': 'HEADING_LEVEL1',
    'H2': 'HEADING_LEVEL2',
    'H3': 'HEADING_LEVEL3',
    'H4': 'HEADING_LEVEL4',
    'H5': 'HEADING_LEVEL5',
    'H6': 'HEADING_LEVEL6',
    'HR': 'HORIZONTAL_RULE',
    'I': 'ITALIC_TEXT',
    'LI': 'LIST_ITEM',
    'LINK': 'MEDIA_LINK',
    'OL': 'ORDERED_LIST',
    'P': 'PARAGRAPH',
    'Q': 'QUOTATION',
    'S': 'STRIKETHROUGH_TEXT',
    'SMALL': 'SMALL_TEXT',
    'SUB': 'SUBSTRIPT',
    'SUP': 'SUPERSCRIPT',
    'TBODY': 'TABLE_BODY',
    'TD': 'TABLE_CELL',
    'TFOOT': 'TABLE_FOOTER',
    'TH': 'TABLE_HEADER_CELL',
    'THEAD': 'TABLE_HEADER',
    'TR': 'TABLE_ROW',
    'TT': 'MONOSPACED_TEXT',
    'U': 'UNDERLINED_TEXT',
    'UL': 'UNORDERED_LIST',
};
/**
 * Creates unique names for placeholder with different content.
 *
 * Returns the same placeholder name when the content is identical.
 */
var PlaceholderRegistry = /** @class */ (function () {
    function PlaceholderRegistry() {
        // Count the occurrence of the base name top generate a unique name
        this._placeHolderNameCounts = {};
        // Maps signature to placeholder names
        this._signatureToName = {};
    }
    PlaceholderRegistry.prototype.getStartTagPlaceholderName = function (tag, attrs, isVoid) {
        var signature = this._hashTag(tag, attrs, isVoid);
        if (this._signatureToName[signature]) {
            return this._signatureToName[signature];
        }
        var upperTag = tag.toUpperCase();
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        var name = this._generateUniqueName(isVoid ? baseName : "START_" + baseName);
        this._signatureToName[signature] = name;
        return name;
    };
    PlaceholderRegistry.prototype.getCloseTagPlaceholderName = function (tag) {
        var signature = this._hashClosingTag(tag);
        if (this._signatureToName[signature]) {
            return this._signatureToName[signature];
        }
        var upperTag = tag.toUpperCase();
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        var name = this._generateUniqueName("CLOSE_" + baseName);
        this._signatureToName[signature] = name;
        return name;
    };
    PlaceholderRegistry.prototype.getPlaceholderName = function (name, content) {
        var upperName = name.toUpperCase();
        var signature = "PH: " + upperName + "=" + content;
        if (this._signatureToName[signature]) {
            return this._signatureToName[signature];
        }
        var uniqueName = this._generateUniqueName(upperName);
        this._signatureToName[signature] = uniqueName;
        return uniqueName;
    };
    PlaceholderRegistry.prototype.getUniquePlaceholder = function (name) {
        return this._generateUniqueName(name.toUpperCase());
    };
    // Generate a hash for a tag - does not take attribute order into account
    PlaceholderRegistry.prototype._hashTag = function (tag, attrs, isVoid) {
        var start = "<" + tag;
        var strAttrs = Object.keys(attrs).sort().map(function (name) { return " " + name + "=" + attrs[name]; }).join('');
        var end = isVoid ? '/>' : "></" + tag + ">";
        return start + strAttrs + end;
    };
    PlaceholderRegistry.prototype._hashClosingTag = function (tag) { return this._hashTag("/" + tag, {}, false); };
    PlaceholderRegistry.prototype._generateUniqueName = function (base) {
        var seen = this._placeHolderNameCounts.hasOwnProperty(base);
        if (!seen) {
            this._placeHolderNameCounts[base] = 1;
            return base;
        }
        var id = this._placeHolderNameCounts[base];
        this._placeHolderNameCounts[base] = id + 1;
        return base + "_" + id;
    };
    return PlaceholderRegistry;
}());
export { PlaceholderRegistry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvaTE4bi9zZXJpYWxpemVycy9wbGFjZWhvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxJQUFNLHdCQUF3QixHQUEwQjtJQUN0RCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLElBQUksRUFBRSxZQUFZO0lBQ2xCLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixHQUFHLEVBQUUsYUFBYTtJQUNsQixJQUFJLEVBQUUsV0FBVztJQUNqQixNQUFNLEVBQUUsWUFBWTtJQUNwQixJQUFJLEVBQUUsY0FBYztJQUNwQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsb0JBQW9CO0lBQ3pCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLElBQUksRUFBRSxZQUFZO0lBQ2xCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLElBQUksRUFBRSxtQkFBbUI7SUFDekIsT0FBTyxFQUFFLGNBQWM7SUFDdkIsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixHQUFHLEVBQUUsaUJBQWlCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7Q0FDdkIsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJ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QyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLE1BQUksSUFBSSxTQUFJLEtBQUssQ0FBQyxJQUFJLENBQUcsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBTSxHQUFHLE1BQUcsQ0FBQztRQUV6QyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDaEMsQ0FBQztJQUVPLDZDQUFlLEdBQXZCLFVBQXdCLEdBQVcsSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFJLEdBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBGLGlEQUFtQixHQUEzQixVQUE0QixJQUFZO1FBQ3RDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUksSUFBSSxTQUFJLEVBQUksQ0FBQztJQUN6QixDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBM0VELElBMkVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jb25zdCBUQUdfVE9fUExBQ0VIT0xERVJfTkFNRVM6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ0EnOiAnTElOSycsXG4gICdCJzogJ0JPTERfVEVYVCcsXG4gICdCUic6ICdMSU5FX0JSRUFLJyxcbiAgJ0VNJzogJ0VNUEhBU0lTRURfVEVYVCcsXG4gICdIMSc6ICdIRUFESU5HX0xFVkVMMScsXG4gICdIMic6ICdIRUFESU5HX0xFVkVMMicsXG4gICdIMyc6ICdIRUFESU5HX0xFVkVMMycsXG4gICdINCc6ICdIRUFESU5HX0xFVkVMNCcsXG4gICdINSc6ICdIRUFESU5HX0xFVkVMNScsXG4gICdINic6ICdIRUFESU5HX0xFVkVMNicsXG4gICdIUic6ICdIT1JJWk9OVEFMX1JVTEUnLFxuICAnSSc6ICdJVEFMSUNfVEVYVCcsXG4gICdMSSc6ICdMSVNUX0lURU0nLFxuICAnTElOSyc6ICdNRURJQV9MSU5LJyxcbiAgJ09MJzogJ09SREVSRURfTElTVCcsXG4gICdQJzogJ1BBUkFHUkFQSCcsXG4gICdRJzogJ1FVT1RBVElPTicsXG4gICdTJzogJ1NUUklLRVRIUk9VR0hfVEVYVCcsXG4gICdTTUFMTCc6ICdTTUFMTF9URVhUJyxcbiAgJ1NVQic6ICdTVUJTVFJJUFQnLFxuICAnU1VQJzogJ1NVUEVSU0NSSVBUJyxcbiAgJ1RCT0RZJzogJ1RBQkxFX0JPRFknLFxuICAnVEQnOiAnVEFCTEVfQ0VMTCcsXG4gICdURk9PVCc6ICdUQUJMRV9GT09URVInLFxuICAnVEgnOiAnVEFCTEVfSEVBREVSX0NFTEwnLFxuICAnVEhFQUQnOiAnVEFCTEVfSEVBREVSJyxcbiAgJ1RSJzogJ1RBQkxFX1JPVycsXG4gICdUVCc6ICdNT05PU1BBQ0VEX1RFWFQnLFxuICAnVSc6ICdVTkRFUkxJTkVEX1RFWFQnLFxuICAnVUwnOiAnVU5PUkRFUkVEX0xJU1QnLFxufTtcblxuLyoqXG4gKiBDcmVhdGVzIHVuaXF1ZSBuYW1lcyBmb3IgcGxhY2Vob2xkZXIgd2l0aCBkaWZmZXJlbnQgY29udGVudC5cbiAqXG4gKiBSZXR1cm5zIHRoZSBzYW1lIHBsYWNlaG9sZGVyIG5hbWUgd2hlbiB0aGUgY29udGVudCBpcyBpZGVudGljYWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGFjZWhvbGRlclJlZ2lzdHJ5IHtcbiAgLy8gQ291bnQgdGhlIG9jY3VycmVuY2Ugb2YgdGhlIGJhc2UgbmFtZSB0b3AgZ2VuZXJhdGUgYSB1bmlxdWUgbmFtZVxuICBwcml2YXRlIF9wbGFjZUhvbGRlck5hbWVDb3VudHM6IHtbazogc3RyaW5nXTogbnVtYmVyfSA9IHt9O1xuICAvLyBNYXBzIHNpZ25hdHVyZSB0byBwbGFjZWhvbGRlciBuYW1lc1xuICBwcml2YXRlIF9zaWduYXR1cmVUb05hbWU6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIGdldFN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKHRhZzogc3RyaW5nLCBhdHRyczoge1trOiBzdHJpbmddOiBzdHJpbmd9LCBpc1ZvaWQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IHRoaXMuX2hhc2hUYWcodGFnLCBhdHRycywgaXNWb2lkKTtcbiAgICBpZiAodGhpcy5fc2lnbmF0dXJlVG9OYW1lW3NpZ25hdHVyZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXTtcbiAgICB9XG5cbiAgICBjb25zdCB1cHBlclRhZyA9IHRhZy50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IGJhc2VOYW1lID0gVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTW3VwcGVyVGFnXSB8fCBgVEFHXyR7dXBwZXJUYWd9YDtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fZ2VuZXJhdGVVbmlxdWVOYW1lKGlzVm9pZCA/IGJhc2VOYW1lIDogYFNUQVJUXyR7YmFzZU5hbWV9YCk7XG5cbiAgICB0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXSA9IG5hbWU7XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIGdldENsb3NlVGFnUGxhY2Vob2xkZXJOYW1lKHRhZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzaWduYXR1cmUgPSB0aGlzLl9oYXNoQ2xvc2luZ1RhZyh0YWcpO1xuICAgIGlmICh0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NpZ25hdHVyZVRvTmFtZVtzaWduYXR1cmVdO1xuICAgIH1cblxuICAgIGNvbnN0IHVwcGVyVGFnID0gdGFnLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3QgYmFzZU5hbWUgPSBUQUdfVE9fUExBQ0VIT0xERVJfTkFNRVNbdXBwZXJUYWddIHx8IGBUQUdfJHt1cHBlclRhZ31gO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9nZW5lcmF0ZVVuaXF1ZU5hbWUoYENMT1NFXyR7YmFzZU5hbWV9YCk7XG5cbiAgICB0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXSA9IG5hbWU7XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyTmFtZShuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgdXBwZXJOYW1lID0gbmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IGBQSDogJHt1cHBlck5hbWV9PSR7Y29udGVudH1gO1xuICAgIGlmICh0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NpZ25hdHVyZVRvTmFtZVtzaWduYXR1cmVdO1xuICAgIH1cblxuICAgIGNvbnN0IHVuaXF1ZU5hbWUgPSB0aGlzLl9nZW5lcmF0ZVVuaXF1ZU5hbWUodXBwZXJOYW1lKTtcbiAgICB0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXSA9IHVuaXF1ZU5hbWU7XG5cbiAgICByZXR1cm4gdW5pcXVlTmFtZTtcbiAgfVxuXG4gIGdldFVuaXF1ZVBsYWNlaG9sZGVyKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2dlbmVyYXRlVW5pcXVlTmFtZShuYW1lLnRvVXBwZXJDYXNlKCkpO1xuICB9XG5cbiAgLy8gR2VuZXJhdGUgYSBoYXNoIGZvciBhIHRhZyAtIGRvZXMgbm90IHRha2UgYXR0cmlidXRlIG9yZGVyIGludG8gYWNjb3VudFxuICBwcml2YXRlIF9oYXNoVGFnKHRhZzogc3RyaW5nLCBhdHRyczoge1trOiBzdHJpbmddOiBzdHJpbmd9LCBpc1ZvaWQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0YXJ0ID0gYDwke3RhZ31gO1xuICAgIGNvbnN0IHN0ckF0dHJzID0gT2JqZWN0LmtleXMoYXR0cnMpLnNvcnQoKS5tYXAoKG5hbWUpID0+IGAgJHtuYW1lfT0ke2F0dHJzW25hbWVdfWApLmpvaW4oJycpO1xuICAgIGNvbnN0IGVuZCA9IGlzVm9pZCA/ICcvPicgOiBgPjwvJHt0YWd9PmA7XG5cbiAgICByZXR1cm4gc3RhcnQgKyBzdHJBdHRycyArIGVuZDtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc2hDbG9zaW5nVGFnKHRhZzogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2hhc2hUYWcoYC8ke3RhZ31gLCB7fSwgZmFsc2UpOyB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVVbmlxdWVOYW1lKGJhc2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2VlbiA9IHRoaXMuX3BsYWNlSG9sZGVyTmFtZUNvdW50cy5oYXNPd25Qcm9wZXJ0eShiYXNlKTtcbiAgICBpZiAoIXNlZW4pIHtcbiAgICAgIHRoaXMuX3BsYWNlSG9sZGVyTmFtZUNvdW50c1tiYXNlXSA9IDE7XG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHRoaXMuX3BsYWNlSG9sZGVyTmFtZUNvdW50c1tiYXNlXTtcbiAgICB0aGlzLl9wbGFjZUhvbGRlck5hbWVDb3VudHNbYmFzZV0gPSBpZCArIDE7XG4gICAgcmV0dXJuIGAke2Jhc2V9XyR7aWR9YDtcbiAgfVxufVxuIl19