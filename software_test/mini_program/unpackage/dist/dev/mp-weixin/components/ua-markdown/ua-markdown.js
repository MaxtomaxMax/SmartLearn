"use strict";
const common_vendor = require("../../common/vendor.js");
const components_uaMarkdown_lib_markdownIt_min = require("./lib/markdown-it.min.js");
const components_uaMarkdown_lib_highlight_uniHighlight_min = require("./lib/highlight/uni-highlight.min.js");
require("./lib/html-parser.js");
const _sfc_main = {
  __name: "ua-markdown",
  props: {
    // 解析内容
    source: String,
    showLine: { type: [Boolean, String], default: true }
  },
  setup(__props) {
    const props = __props;
    let copyCodeData = [];
    const markdown = components_uaMarkdown_lib_markdownIt_min.mt({
      html: true,
      highlight: function(str, lang) {
        let preCode = "";
        try {
          preCode = components_uaMarkdown_lib_highlight_uniHighlight_min.$e.highlightAuto(str).value;
        } catch (err) {
          preCode = markdown.utils.escapeHtml(str);
        }
        const lines = preCode.split(/\n/).slice(0, -1);
        let html = lines.map((item, index) => {
          if (item == "") {
            return "";
          }
          return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + "</li>";
        }).join("");
        if (props.showLine) {
          html = '<ol style="padding: 0px 30px;">' + html + "</ol>";
        } else {
          html = '<ol style="padding: 0px 7px;list-style:none;">' + html + "</ol>";
        }
        copyCodeData.push(str);
        let htmlCode = `<div class="markdown-wrap">`;
        htmlCode += `<pre class="hljs" style="padding:10px 8px 0;margin-bottom:5px;overflow: auto;display: block;border-radius: 5px;"><code>${html}</code></pre>`;
        htmlCode += "</div>";
        return htmlCode;
      }
    });
    const parseNodes = (value) => {
      if (!value)
        return;
      value = value.replace(/<br>|<br\/>|<br \/>/g, "\n");
      value = value.replace(/&nbsp;/g, " ");
      let htmlString = "";
      if (value.split("```").length % 2) {
        let mdtext = value;
        if (mdtext[mdtext.length - 1] != "\n") {
          mdtext += "\n";
        }
        htmlString = markdown.render(mdtext);
      } else {
        htmlString = markdown.render(value);
      }
      htmlString = htmlString.replace(/<table/g, `<table class="table"`);
      htmlString = htmlString.replace(/<tr/g, `<tr class="tr"`);
      htmlString = htmlString.replace(/<th>/g, `<th class="th">`);
      htmlString = htmlString.replace(/<td/g, `<td class="td"`);
      htmlString = htmlString.replace(/<hr>|<hr\/>|<hr \/>/g, `<hr class="hr">`);
      return htmlString;
    };
    const handleItemClick = (e) => {
      let { attrs } = e.detail.node;
      let { "code-data-index": codeDataIndex, "class": className } = attrs;
      if (className == "copy-btn") {
        common_vendor.index.setClipboardData({
          data: copyCodeData[codeDataIndex],
          showToast: false,
          success() {
            common_vendor.index.showToast({
              title: "复制成功",
              icon: "none"
            });
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: parseNodes(__props.source),
        b: common_vendor.o(handleItemClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-64f4d077"], ["__file", "D:/SmartLearn/software_test/mini_program_test/components/ua-markdown/ua-markdown.vue"]]);
wx.createComponent(Component);
