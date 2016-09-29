FROM			mhart/alpine-node:latest
MAINTAINER		Earvin <earvin@earvinkayonga.com>

ENV			NODE_ENV	production
ENV			PORT	443
ENV			PORTR	80


RUN 			echo "ipv6" >> /etc/modules \
    			echo "http://dl-1.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories; \
    			echo "http://dl-2.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories; \
    			echo "http://dl-3.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories; \
    			echo "http://dl-4.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories; \
    			echo "http://dl-5.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories

#RUN			apk add  --no-cache --update git && git clone https://github.com/EarvinKayonga/videochat.git videochat && apk del git;

ADD			.	videochat

WORKDIR			videochat

RUN			npm i -g bower; npm i -production;

EXPOSE			80 443

CMD			["npm", "start"]
