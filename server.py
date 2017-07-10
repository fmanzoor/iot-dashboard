#!/usr/bin/env python
import json
import web

urls = ('/admin', 'admin',
        '/time/', 'time',
        '/ip/', 'ip',
        '/reset/', 'reset',
        '/restart/', 'restart'
        )

render = web.template.render('templates/')
app = web.application(urls, globals())

class admin:

    def GET(self):
        return render.admin()


class time:
    def POST(self):
        data = web.input()
        timezone = data.timezone_settings_timezone
        country = data.timezone_settings_country
        # This is the timezone data we can pass to OS
        # todo: Need to write script to pass the information to OS
        d = dict()
        web.header('Content-Type', 'application/json')
        if timezone and country:
            d['status'] = 'success'
            web.accepted()
        else:
            d['status'] = 'error'
            web.BadRequest()
        return json.dumps(d)

    def GET(self):
        return web.seeother('/admin')


class ip:
    def POST(self):
        data = web.input()
        # We can process and manipulate data here
        # todo: Need to write a script to pass the information to ifconfig
        d = dict()
        web.header('Content-Type', 'application/json')
        d['status'] = 'success'
        d['data'] = data
        web.accepted()
        return json.dumps(d)

    def GET(self):
        return web.seeother('/admin')


class reset:
    def POST(self):
        # todo: Need to invoke the script to remove/reset configuration files
        d = dict()
        web.header('Content-Type', 'application/json')
        d['status'] = 'success'
        d['message'] = 'Resetting system soon'
        web.accepted()
        return json.dumps(d)


class restart:
    def POST(self):
        d = dict()
        # todo: Need to write a script to rebooot the OS, preferably after some seconds of delay
        web.header('Content-Type', 'application/json')
        d['status'] = 'success'
        d['message'] = 'Restarting system soon'
        web.accepted()
        return json.dumps(d)


if __name__=="__main__":
    web.internalerror = web.debugerror
    app.run()
