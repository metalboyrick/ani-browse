const Theme = {
    colors: {
        primary : '#7879F1',
        danger : '#EB5757',
        success : '#27AE60',
        background: '#0D1B2A',
        black: '#000000',
        white: '#FFFFFF',
        gray: '#989898'
    },
    mediaQuery: {
        breakpoints: [576, 768, 992, 1200],
        bpMap: function (bp){return `@media (min-width: ${bp}px)`;}
    },
    fontSize: {
        reg: '12pt',
        sectionHeader: '20pt',
        pageHeader: '24pt',
    }
};

export default Theme;