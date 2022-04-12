export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id:2,
        label: "menuitems.dashboards.text",
        icon: "bx-home-circle",
        link: "/"
    },
    {
        id: 3,
        label: "menuitems.agen-management.text",
        icon: "bx-user",
        link: "/agent-management",
    },
    {
        id: 4,
        label: "menuitems.customer-management.text",
        icon: "bx-user",
        link: "/customer-management",
    },
    {
        id: 5,
        label: "menuitems.case-management.text",
        icon: "bx bxs-file",
        link: "/case-management",
    },
    {
        id: 6,
        label: "menuitems.live-chat.text",
        icon: "bx-chat",
        link: "/live-chat",
    },
  
    {
        id: 7,
        label: "menuitems.user-management.text",
        icon: "bx-user",
        link: "/user-management",
    },
    {
        id: 10,
        label: "menuitems.settings.text",
        icon: "bx-cog",
        subItems: [
            {
                id: 11,
                label: "menuitems.region.text",
                link: "/region",
                parentId: 10
            },
            {
                id: 12,
                label: "menuitems.classification.text",
                link: "/classification",
                parentId: 10
            },
            {
                id: 12,
                label: "menuitems.package.text",
                link: "/package",
                parentId: 10
            },
        ]
    },
];

