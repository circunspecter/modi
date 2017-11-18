{% assign page_url = page.url | split: '/' | shift | join: "/" %}
{: .menu}
- [Quick start]({{ site.baseurl }}/ "Quick start"){% if page_url == '' %}{: .active}{% endif %}
- [Configuration]({{ site.baseurl }}/configuration "Configuration"){% if page_url == 'configuration' %}{: .active}{% endif %}
- [Reference]({{ site.baseurl }}/reference "Reference"){% if page_url == 'reference' %}{: .active}{% endif %}
- {: .section} Templates
- [Default]({{ site.baseurl }}/templates/default "Default template"){% if page_url == 'templates/default' %}{: .active}{% endif %}
- [Actions]({{ site.baseurl }}/templates/actions "Actions template"){% if page_url == 'templates/actions' %}{: .active}{% endif %}
- [Notification]({{ site.baseurl }}/templates/notification "Notification template"){% if page_url == 'templates/notification' %}{: .active}{% endif %}
