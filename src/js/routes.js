
import HomePage from '../pages/home.jsx';
import LoginPage from '../pages/login.jsx';
import verifyOTPPage from '../pages/verifyOTP.jsx';
import WelcomePage from '../pages/welcome.jsx';
import RegisterFarmerPage from '../pages/registerFarmer.jsx';
import RegisterFarmerFormPage from '../pages/registerFarmerForm.jsx';
import RegisterFarmFormPage from '../pages/registerFarmForm.jsx';
import ReviewRegistrationPage from '../pages/reviewRegistration.jsx';
import RegistrationCompletePage from '../pages/registrationComplete.jsx';
import ConnectFarmerPage from '../pages/connectFarmer.jsx';
import VerifyFarmerPage from '../pages/verifyFarmer.jsx';
import ReviewFarmerConnectionPage from '../pages/reviewFarmerConnection.jsx';
import EditRegisterFarmerPage from '../pages/editRegisterFarmerFormPage.jsx';
import EditRegisterFarmFormPage from '../pages/editRegisterFarmFormPage.jsx';
import OnboardedFarmers from '../pages/onboardedFarmersList.jsx';
import OnboardedFarmerDetail from '../pages/OnboardedFarmerDetail.jsx';
import EditOnboardedFarmerDetail from '../pages/editOnboardedFarmer.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';
import TransactionDetailPage from '../pages/transactionDetail.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '/verifyOTP/:phoneNumber',
    component: verifyOTPPage,
  },
  {
    path: '/welcome/',
    component: WelcomePage,
  },
  {
    path: '/registerFarmerForm/:account',
    component: RegisterFarmerFormPage,
  },
  {
    path: '/registerFarmForm/',
    component: RegisterFarmFormPage,
  },
  {
    path: '/registerFarmer/',
    component: RegisterFarmerPage,
  },
  {
    path: '/reviewRegistration/',
    component: ReviewRegistrationPage,
  },
  {
    path: '/editFarmerRegistration/',
    component: EditRegisterFarmerPage,
  },
  {
    path: '/editFarmRegistration/',
    component: EditRegisterFarmFormPage,
  },
  {
    path: '/verifyFarmer/',
    component: VerifyFarmerPage,
  },
  {
    path: '/connectFarmer/',
    component: ConnectFarmerPage,
  },
  {
    path: '/onboardedFarmers/',
    component: OnboardedFarmers,
  },
  {
    path: '/onboardedFarmer/:id/:phone',
    component: OnboardedFarmerDetail,
  },
  {
    path: '/editOnboardedFarmerDetail/:id/:phone',
    component: EditOnboardedFarmerDetail,
  },
  {
    path: '/transactionDetail/',
    component: TransactionDetailPage,
  },
  {
    path: '/reviewFarmerConnection/',
    component: ReviewFarmerConnectionPage,
  },
  {
    path: '/registrationComplete/',
    component: RegistrationCompletePage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
