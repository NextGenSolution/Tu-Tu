export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'Todo',
        data: {
          menu: {
            title: 'Todo Elements',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 1,
          }
        },
        children: [
          {
            path: 'todoLists',
            data: {
              menu: {
                title: 'Todo Lists',
              }
            }
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'Assign To Me',
              }
            }
          }
        ]
      },
      {
        path: 'editors',
        data: {
          menu: {
            title: 'Editors',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'ckeditor',
            data: {
              menu: {
                title: 'CKEditor',
              }
            }
          }
        ]
      },
      {
        path: 'components',
        data: {
          menu: {
            title: 'Components',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
        children: [
          {
            path: 'treeview',
            data: {
              menu: {
                title: 'Tree View',
              }
            }
          }
        ]
      },
      {
        path: 'charts',
        data: {
          menu: {
            title: 'Charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'Chartist.Js',
              }
            }
          }
        ]
      },
      {
        path: 'tasks',
        data: {
          menu: {
            title: 'Create new task',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 355,
          }
        }
      },
      {
        path: 'tasklist',
        data: {
          menu: {
            title: 'My Task List',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 360,
          }
        }
      },
       {
        path: 'allTasksList',
        data: {
          menu: {
            title: 'Task List',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 370,
          }
        }
      },
      {
        path: 'ui',
        data: {
          menu: {
            title: 'UI Features',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        children: [
          {
            path: 'typography',
            data: {
              menu: {
                title: 'Typography',
              }
            }
          },
          {
            path: 'buttons',
            data: {
              menu: {
                title: 'Buttons',
              }
            }
          },
          {
            path: 'icons',
            data: {
              menu: {
                title: 'Icons',
              }
            }
          },
          {
            path: 'grid',
            data: {
              menu: {
                title: 'Grid',
              }
            }
          },
        ]
      },
      {
        path: 'forms',
        data: {
          menu: {
            title: 'User Details',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
        children: [
          {
            path: 'inputs',
            data: {
              menu: {
                title: 'Assign Badges',
              }
            }
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'User Profile',
              }
            }
          }
        ]
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: 'Tables',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'basictables',
            data: {
              menu: {
                title: 'Basic Tables',
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'Smart Tables',
              }
            }
          }
        ]
      },
      {
        path: 'maps',
        data: {
          menu: {
            title: 'Maps',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Google Maps',
              }
            }
          },
          {
            path: 'leafletmaps',
            data: {
              menu: {
                title: 'Leaflet Maps',
              }
            }
          },
          {
            path: 'bubblemaps',
            data: {
              menu: {
                title: 'Bubble Maps',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'Line Maps',
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Login',
                url: '#/login'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Register',
                url: '#/register'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            selected: false,
            expanded: false,
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.1',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.2',
                url: '#'
              }
            },
            children: [
              {
                path: '',
                data: {
                  menu: {
                    title: 'Menu Level 1.2.1',
                    url: '#'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'External Link',
            url: 'http://akveo.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];
