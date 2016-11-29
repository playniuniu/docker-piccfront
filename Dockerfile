FROM alpine:latest
MAINTAINER playniuniu@gmail.com

COPY web/ /usr/src/web/
COPY config/nginx.conf /root/nginx.conf

WORKDIR /usr/src/web/

RUN apk add --no-cache --update nginx nodejs \
    && npm install \
    && npm run build \
    && rm -rf node_modules \
    && apk del nodejs \
    && rm -rf /var/cache/apk/* \
    && rm /etc/nginx/nginx.conf \
    && mv /root/nginx.conf /etc/nginx/

EXPOSE 80

CMD ["/usr/sbin/nginx"]
