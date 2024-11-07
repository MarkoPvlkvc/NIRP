FROM postgres:15-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123456
ENV POSTGRES_DB=ORBaza

COPY ORBaza_dump.sql /docker-entrypoint-initdb.d/

EXPOSE 5432