Setting up hackerDS
===================

This descibes how to set up hackerDS code with the NVVDepartures module


Steps
-----

1. Clone hackerDS core from github `git@github.com:hackerDS/hackerDS.git`
2. Clone hackerDS NVVDeparture module from github `git@github.com:hackerDS/NVVDepartures.git`
3. Clone NVVRestApi from github `git@github.com:hackerDS/NVVDepartures.git`
4. Run `npm install` on all folders (shold be 3x)
5. Run `grunt build` on the hackerDS core folder
6. Symlink the `NVVDepartures` folder into the `hackerDS/apps` folder
7. Start the NvvRestApi (on port 3001)
8. Start hackerDS
9. Open `http://localhost:3000`