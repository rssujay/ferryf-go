# ferryf-go

ferryf is a minimalistic link-based, setupless file transfer application. It is not currently live due to RAM/storage costs :P 

Screenshots can be found within the `ferryf_ss` directory.

<img src=ferryf_ss/upload.jpg>

# Contents
- Motivation
- Technologies used
- Setup instructions

## Motivation:

The idea behind ferryf is to allow for minimalist sharing of files between devices over the internet. Using ferryf avoids the need for installation of additional software, additional protocols or account sign-ins, making it suitable for temporary internet-connected devices to perform one-off transfers.

The technical motivations are to build a web project:
- that involves some basic - intermediate complexity / concerns that occurs in the real world (e.g. file management and delivery)
- that does not require too many features to be viable for a solo, short-term effort
- that can increase familiarity with system design + newer frameworks / libraries

Note: By deploying/using/trying out this service, you acknowledge that you are using ferryf out of your own curiosity, at your own risk. You will not hold the developer liable for any reason, e.g. loss or misuse of data. Here are some better, professionally-managed [alternatives](https://blog.bit.ai/free-file-sharing-sites/).

## Technologies used:

- React with TypeScript
- [PrimeReact](https://www.primefaces.org/primereact/), an awesome UI library
- [Gin](https://github.com/gin-gonic/gin), a Golang web framework
- Docker & Docker-Compose
- Nginx (as reverse proxy, and (static/dynamic) file server)
- PostgreSQL (this can be swapped out easily) 


## Setup instructions:
Requirements: docker + docker-compose installed

- This secrets folder will be missing from version control upon cloning (for obvious reasons...). Please create the `secrets` folder + the file `config.go` as shown below. Documentation for connecting to DB using `gorm` can be found online regardless, if you get stuck. Remote DB instances can be created for free online as well, if needed.
<img src=ferryf_ss/secrets.jpg>

- Once that's added, run `docker-compose up` and navigate to `localhost:80`. The app is resilient to domain name configuration (it uses `window.location` appropriately)

