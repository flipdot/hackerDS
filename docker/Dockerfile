FROM node # x64
#FROM hypriot/rpi-node:0.10.36 # Raspberrry-PI (ARMv6)

MAINTAINER Daniel Huhn (daniel@danielhuhn.de)

# Update and install wget
RUN DEBIAN_FRONTEND=noninteractive apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q supervisor

RUN npm install -g grunt-cli

# base system
RUN mkdir -p /app/hackerDS && \
    cd /app/hackerDS && \
    git clone https://github.com/hackerDS/hackerDS.git . && \
    npm install && \
    grunt build

# nvv api
RUN mkdir -p /app/flipdot/NvvRestApi && \
    cd /app/flipdot/NvvRestApi && \
    git clone https://github.com/flipdot/NvvRestApi.git . && \
    npm install && \
    cd /app/hackerDS/apps && \
    git clone https://github.com/hackerDS/NVVDepartures.git && \
    cd NVVDepartures && \
    npm install

# hutschinen controller
RUN cd /app/hackerDS/apps && \
    git clone https://github.com/hackerDS/HutschienenController.git && \
    cd HutschienenController && \
    npm install

# music
RUN cd /app/hackerDS/apps && \
    git clone https://github.com/hackerDS/hackerDS_music.git && \
    cd HutschienenController && \
    npm install

RUN cd /app/hackerDS/apps && \
    git clone https://github.com/flipdot/flipdot-power-consumption.git

RUN mkdir -p /var/log/supervisor
ADD conf/supervisor.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 3000

# start supervisord
CMD ["/usr/bin/supervisord"]
