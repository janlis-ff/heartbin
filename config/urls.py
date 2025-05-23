from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include
from django.urls import path
from django.urls import re_path
from django.views import defaults as default_views
from django.views.generic import TemplateView
from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularSwaggerView

urlpatterns = [
    path(
        "",
        TemplateView.as_view(template_name="pages/home.html"),
        name="home",
    ),
    re_path(
        "^inbox/(?P<inbox_uuid>[0-9a-f-]+)/$",
        TemplateView.as_view(template_name="pages/reply.html"),
        name="inbox-reply",
    ),
    re_path(
        "^inbox/(?P<inbox_uuid>[0-9a-f-]+)/answers/$",
        TemplateView.as_view(template_name="pages/answers.html"),
        name="inbox-answers",
    ),
    # Django admin URL
    path(
        settings.ADMIN_URL,
        admin.site.urls,
    ),
    # Media
    *static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    ),
    # API URLs
    path(
        "api/schema/",
        SpectacularAPIView.as_view(),
        name="api-schema",
    ),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="api-schema"),
        name="api-docs",
    ),
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [
            path("__debug__/", include(debug_toolbar.urls)),
            *urlpatterns,
        ]
