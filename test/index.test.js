let chai, expect, replaceLinkId, replaceRef;

before(async function () {
    global.hexo = {
        extend: {
            filter: {
                register: function (name, func) {
                    this[name] = func;
                }
            }
        }
    };
    global.cachedPost = { file: '123456/' }; // Set the cached post

    chai = await import('chai');
    expect = chai.expect;
    const module = await import('../index.js');
    replaceLinkId = module.replaceLinkId;
    replaceRef = module.replaceRef;
});

describe('replaceLinkId', function () {
    it('should replace link ID', function () {
        const data = { content: '^id' };
        replaceLinkId(data);
        const expectedContent = '<span id="^id" style="font-size: smaller; color: gray; vertical-align: top; opacity: 0.75;">^id</span>';
        expect(data.content).to.include(expectedContent);
    });
});

// describe('replaceRef', function () {
//     it('should replace ref', function () {
//         const post = {
//             content: `[[file]]
//             More text here.
//         `, source: 'file'
//         };
//         replaceRef(post);
//         const expectedContent = '<a href="/123456/#title">text</a>';
//         expect(post.content).to.include(expectedContent);
//     });
// });