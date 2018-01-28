{% assign page_url = page.url | remove_first: release_path %}
{: .menu}
- [Quick start]({{ baseurl_release }}/ "Quick start"){% if page_url == '/' %}{: .active}{% endif %}
- [Configuration]({{ baseurl_release }}/configuration "Configuration"){% if page_url == '/configuration/' %}{: .active}{% endif %}
- [Reference]({{ baseurl_release }}/reference "Reference"){% if page_url == '/reference/' %}{: .active}{% endif %}
- {: .section} Templates
- [Default]({{ baseurl_release }}/templates/default "Default template"){% if page_url == '/templates/default/' %}{: .active}{% endif %}
- [Actions]({{ baseurl_release }}/templates/actions "Actions template"){% if page_url == '/templates/actions/' %}{: .active}{% endif %}
- [Notification]({{ baseurl_release }}/templates/notification "Notification template"){% if page_url == '/templates/notification/' %}{: .active}{% endif %}
- {: .section} Releases
- [2.0.0]({{ site.baseurl }}/ "2.0.0"){% unless page.release %}{: .active}{% endunless  %}
- [1.1.0]({{ site.baseurl }}/releases/1.1.0/ "1.1.0"){% if page.release == '1.1.0' %}{: .active}{% endif %}
