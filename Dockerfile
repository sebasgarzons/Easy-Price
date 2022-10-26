FROM httpd:2.4
COPY . /usr/local/apache2/htdocs/
RUN cat /usr/local/apache2/htdocs/texttest.txt >> /usr/local/apache2/conf/original/httpd.conf
