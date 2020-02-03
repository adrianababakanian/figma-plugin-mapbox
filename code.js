// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    const page = figma.currentPage;
    const depthLimit = 5;
    function visit(x, y, radius, depth, dir) {
        if (depth < depthLimit) {
            if (dir !== 'E')
                visit(x - radius * 3 / 2, y, radius / 2, depth + 1, 'W');
            if (dir !== 'W')
                visit(x + radius * 3 / 2, y, radius / 2, depth + 1, 'E');
            if (dir !== 'S')
                visit(x, y - radius * 3 / 2, radius / 2, depth + 1, 'N');
            if (dir !== 'N')
                visit(x, y + radius * 3 / 2, radius / 2, depth + 1, 'S');
        }
        const node = figma.createEllipse();
        node.x = x - radius;
        node.y = y - radius;
        node.resizeWithoutConstraints(2 * radius, 2 * radius);
        let fills = [{
                type: 'SOLID',
                color: { r: 0.5 + x / 600, g: 0.5 + y / 600, b: 1 - depth / depthLimit }
            }];
        node.fills = fills;
        page.appendChild(node);
    }
    visit(0, 0, 100, 0, null);
    figma.closePlugin();
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
